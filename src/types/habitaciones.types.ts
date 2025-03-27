export interface HabitacionAttributes {
  idHabitacion: number;
  numeroHabitacion: number;
  precio: number;
  idSede: number;
  activo: boolean;
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

// Para la ruta PostOne (crear una nueva habitación)
export interface PostOneHabitacion {
  body: {
    numeroHabitacion: number;
    precio: number;
    idSede: number;
    activo: boolean; // Opcional, ya que tiene un valor por defecto
  };
}

// Para la ruta GetOne (obtener una habitación por idHabitacion)
export interface GetOneHabitacion {
  params: {
    idHabitacion: number;
  };
}

// Para la ruta PatchOne (actualizar una habitación)
export interface PatchOneHabitacion {
  params: {
    idHabitacion: number;
  };
  body: {
    numeroHabitacion?: number; // Opcional
    precio?: number; // Opcional
    activo?: boolean; // Opcional
  };
}

// Para la ruta GetMany (obtener múltiples habitaciones con filtros)
export interface GetManyHabitacionesQuery extends Filter {
  query: Filter['query'] & Partial<HabitacionAttributes>;
}
