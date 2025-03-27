import { HabitacionAttributes } from './habitaciones.types';

export interface ResidenteAttributes {
  idResidente: number;
  uuidResidente: string;
  nombre: string;
  telefono?: string;
  correo?: string;
  cedula: string;
  idSede: number;
  idHabitacion: number | null; // Puede ser NULL
  activo: boolean;
  createdAt: Date; // ISO timestamp
  updatedAt: Date; // ISO timestamp

  // Relación con Habitacion
  habitacion?: HabitacionAttributes; // Relación opcional
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

// Para la ruta PostOne (crear un nuevo residente)
export interface PostOneResidente {
  body: {
    uuidResidente: string;
    nombre: string;
    telefono?: string; // Opcional
    correo?: string; // Opcional
    cedula: string;
    idHabitacion: number; // Opcional
    activo?: boolean; // Opcional, ya que tiene un valor por defecto
  };
}

// Para la ruta GetOne (obtener un residente por idResidente)
export interface GetOneResidente {
  params: {
    idResidente: number;
  };
}

// Para la ruta PatchOne (actualizar un residente)
export interface PatchOneResidente {
  params: {
    idResidente: number;
  };
  body: {
    nombre?: string; // Opcional
    telefono?: string; // Opcional
    correo?: string; // Opcional
    cedula?: string; // Opcional
    idHabitacion?: number | null; // Opcional
    activo?: boolean; // Opcional
  };
}

// Para la ruta GetMany (obtener múltiples residentes con filtros)
export interface GetManyResidentesQuery extends Filter {
  query: Filter['query'] & Partial<ResidenteAttributes>;
}
