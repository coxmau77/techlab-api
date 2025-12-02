/**
 * Wrapper para manejar errores asíncronos en controladores
 * @param {Function} fn - Función asíncrona a envolver
 * @returns {Function} - Función envuelta con manejo de errores
 */
export const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
