import { Op } from 'sequelize';

/** Funcion que crea la sentencia where para las querys a partir del objeto query
 *
 * @param {Object} param0 - Objeto con la query
 * @returns {Object} - Objeto con la sentencia where
 */

const crearWhereQuery = ({ query }: { query: any }) => {
  const queryObject = {
    ...query,
  };

  // Inicialmente se eliminan los campos que son genericos para todas las APIs
  delete queryObject.limit;
  delete queryObject.page;
  delete queryObject.sortBy;
  delete queryObject.sortOrder;

  // Posteriormente se crea el objeto de sentencia where
  const where: any = {};

  // Se recorren los campos que se reciben en la query
  Object.keys(queryObject).forEach((key) => {
    if (queryObject[key]) {
      if (Array.isArray(queryObject[key])) {
        where[key] = {
          [Op.in]: queryObject[key],
        };
      } else {
        if (key.includes('_')) {
          const [campo, operador] = key.split('_');

          // Validar que el operador sea una clave válida de Op
          if (!operadoresSequelizeSoportados.includes(operador as keyof typeof Op)) {
            throw new Error(`El operador ${operador} no es soportado`);
          }

          if (operador === 'like') {
            where[campo] = {
              [Op.like]: `%${queryObject[key]}%`,
            };
            // En caso de que el operador sea gt o gte, se debe buscar si hay un respectivo campo lt o lte para hacer un between
          } else if (
            ((operador === 'gt' || operador === 'gte') && queryObject[`${campo}_lt`]) ||
            queryObject[`${campo}_lte`]
          ) {
            where[campo] = {
              [Op.between]: [
                queryObject[`${campo}_gte`] || queryObject[`${campo}_gt`],
                queryObject[`${campo}_lte`] || queryObject[`${campo}_lt`],
              ],
            };
            // En caso de que el operador sea lt o lte, se debe buscar si hay un respectivo campo gt o gte para hacer un between
          } else if (
            (operador === 'lt' || operador === 'lte') &&
            (queryObject[`${campo}_gt`] || queryObject[`${campo}_gte`])
          ) {
            where[campo] = {
              [Op.between]: [
                queryObject[`${campo}_gt`] || queryObject[`${campo}_gte`],
                queryObject[`${campo}_lt`] || queryObject[`${campo}_lte`],
              ],
            };
          } else {
            where[campo] = {
              [Op[operador as keyof typeof Op]]: queryObject[key],
            };
          }
        } else {
          where[key] = queryObject[key];
        }
      }
    }
  });

  return where;
};

const operadoresSequelizeSoportados = [
  'eq',
  'ne',
  'gte',
  'gt',
  'lte',
  'lt',
  'not',
  'is',
  'in',
  'notIn',
  'like',
];

export default crearWhereQuery;
