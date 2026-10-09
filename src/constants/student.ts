export const STUDENT = {
    mssv: '23736281',
    hoTen: 'NGUYEN VU HOANG',
} as const;

export const LAST_DIGIT = 1;
export const STUDENT_SEED = 281;

export const DEBOUNCE_MS = 400; // 300 + 1 * 100
export const STALE_TIME_MS = 11000; // 10000 + 1 * 1000
export const PRICE_MULTIPLIER = 15500; // 15000 + 1 * 500
export const BASE_SHIP_FEE = 9000; // 8000 + 1 * 1000
export const ROOM_LABEL = 'P.381'; // 100 + 281
export const BANNER_IMAGE_ID = 331;

export const VARIANT = {
    watermarkAtTop: false,
    authField: 'phone',
    tabOrder: 'shopFirst',
    hapticOnAdd: 'selection',
    shipFormula: 'B',
    detailPresentation: 'card',
} as const;

export function examStamp(): string {
    const raw = `TH2|${STUDENT.mssv}|${STUDENT.hoTen}`;
    let h = 5381;
    for (let i = 0; i < raw.length; i++) {
        h = Math.imul(h, 33) ^ raw.charCodeAt(i);
    }
    return String(Math.abs(h) % 1000000).padStart(6, '0');
}