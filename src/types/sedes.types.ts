export interface SedeAttributes {
  idSede: number;
  uuidSede: string;
  nombre: string;
  direccion: string;
  createdAt: Date; // ISO timestamp
  updatedAt: Date; // ISO timestamp
}

// Filtro genericos para todas las APIs (no obligatorios)
export interface Filter {
  query: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
  };
}

// Para la ruta PostOne
export interface PostOneSede {
  body: {
    nombre: string;
    direccion: string;
  };
}

// Para la ruta GetOne
export interface GetOneSede {
  params: {
    idSede: number;
  };
}

// Para la ruta PatchOne
export interface PatchOneSede {
  params: {
    idSede: number;
  };
  body: {
    nombre?: string; // Opcional
    direccion?: string; // Opcional
  };
}

// Para la ruta GetMany
export interface GetManySedeQuery extends Filter {
  query: Filter['query'] & Partial<SedeAttributes>;
}
