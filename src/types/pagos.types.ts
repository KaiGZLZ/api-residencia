export interface PagoAttributes {
  idPago: number;
  uuidPago: string;
  idResidente: number;
  idHabitacion: number;
  idSede: number;
  monto: number;
  createdAt: Date; // ISO timestamp
  updatedAt: Date; // ISO timestamp
}

// Filtro genérico para todas las APIs (no obligatorios)
export interface Filter {
  query: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortOrder?: string;
  };
}

// Para la ruta PostOne (crear un nuevo pago)
export interface PostOnePago {
  body: {
    uuidPago: string;
    idResidente: number;
  };
}

// Para la ruta GetOne (obtener un pago por idPago)
export interface GetOnePago {
  params: {
    idPago: number;
  };
}

// Para la ruta PatchOne (actualizar un pago)
export interface PatchOnePago {
  params: {
    idPago: number;
  };
  body: {
    idResidente?: number; // Opcional
    idHabitacion?: number; // Opcional
    idSede?: number; // Opcional
    monto?: number; // Opcional
  };
}

// Para la ruta GetMany (obtener múltiples pagos con filtros)
export interface GetManyPagosQuery extends Filter {
  query: Filter['query'] & Partial<PagoAttributes>;
}
