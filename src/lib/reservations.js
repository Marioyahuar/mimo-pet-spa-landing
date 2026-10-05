// Validación y serialización de reservas para las API routes (ADR-0006, ADR-0009).
// Cualquier conversión date/time -> instante pasa por src/lib/time.js (ADR-0010).
import { slotToInstant } from './time.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const REQUIRED_STRINGS = [
  'serviceTitle',
  'servicePriceLabel',
  'petName',
  'petBreed',
  'petSize',
  'contactName',
  'contactPhone',
  'contactEmail',
];

/** true si `date` ('YYYY-MM-DD') y `time` ('HH:mm') son válidos según time.js. */
export function isValidSlot(date, time) {
  try {
    slotToInstant(date, time);
    return true;
  } catch {
    return false;
  }
}

/** 'YYYY-MM-DD' válido (existente en calendario). */
export function isValidDate(date) {
  return isValidSlot(date, '00:00');
}

/**
 * Valida el body. Devuelve { fields: [...] } si hay errores, o { data } con el payload limpio.
 */
export function parseReservationBody(body) {
  if (body === null || typeof body !== 'object' || Array.isArray(body)) {
    return { fields: ['body'] };
  }
  const fields = [];
  const data = {};

  for (const k of REQUIRED_STRINGS) {
    const v = body[k];
    if (typeof v !== 'string' || v.trim() === '') fields.push(k);
    else data[k] = v.trim();
  }

  if (!Array.isArray(body.extras) || !body.extras.every((x) => typeof x === 'string')) {
    fields.push('extras');
  } else {
    data.extras = body.extras;
  }

  if (body.petNotes == null || body.petNotes === '') data.petNotes = null;
  else if (typeof body.petNotes === 'string') data.petNotes = body.petNotes;
  else fields.push('petNotes');

  if (typeof body.idempotencyKey !== 'string' || !UUID_RE.test(body.idempotencyKey)) {
    fields.push('idempotencyKey');
  } else {
    data.idempotencyKey = body.idempotencyKey.toLowerCase();
  }

  if (typeof body.date !== 'string' || !isValidDate(body.date)) fields.push('date');
  else data.date = body.date;

  if (typeof body.time !== 'string' || !isValidSlot('2000-01-01', body.time)) fields.push('time');
  else data.time = body.time;

  return fields.length ? { fields } : { data };
}

/** Valor para la columna @db.Date a partir de 'YYYY-MM-DD' (la columna date no lleva hora ni zona). */
export function dateToColumn(date) {
  return new Date(`${date}T00:00:00.000Z`);
}

/** Fila Prisma -> JSON público (date como 'YYYY-MM-DD'). */
export function serializeReservation(row) {
  return {
    id: row.id,
    serviceTitle: row.serviceTitle,
    servicePriceLabel: row.servicePriceLabel,
    extras: row.extras,
    petName: row.petName,
    petBreed: row.petBreed,
    petSize: row.petSize,
    petNotes: row.petNotes,
    date: row.date.toISOString().slice(0, 10),
    time: row.time,
    contactName: row.contactName,
    contactPhone: row.contactPhone,
    contactEmail: row.contactEmail,
    createdAt: row.createdAt.toISOString(),
    idempotencyKey: row.idempotencyKey,
  };
}
