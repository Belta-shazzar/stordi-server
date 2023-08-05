// import { ClassConstructor, plainToInstance } from 'class-transformer';
// import {
//   validate,
//   ValidationError as CValidationError,
//   ValidatorOptions,
// } from 'class-validator';
// import { ValidationException } from '../exceptions/http';

// export const getAllConstraints = (errors: CValidationError[]) => {
//   const constraints: Record<string, any>[] = [];
//   // eslint-disable-next-line no-restricted-syntax
//   for (const error of errors) {
//     if (error.constraints) {
//       constraints.push(error.constraints);
//     }
//     if (error.children) {
//       constraints.push(...getAllConstraints(error.children));
//     }
//   }

//   return constraints;
// };

// export async function transformAndValidate<T, V>(
//   schema: ClassConstructor<T>,
//   body: V,
//   options: ValidatorOptions = {},
// ): Promise<string[]> {
//   const transformed = <Record<string, never>>(
//     plainToInstance<T, V>(schema, body)
//   );

//   const errors = await validate(transformed, {
//     whitelist: true,
//     forbidNonWhitelisted: true,
//     validationError: { target: false },
//     ...options,
//   });

//   if (errors.length > 0) {
//     const constraints = getAllConstraints(errors);
//     return constraints.map((c) => Object.values(c)).flat();
//   }

//   return [] as string[];
// }

// export function wrapServiceAction<T, V extends (args: any) => any>(params: {
//   schema?: ClassConstructor<T>;
//   handler: V;
// }): (...funcArgs: Parameters<V>) => Promise<ReturnType<V>> {
//   if (!params.schema) {
//     return params.handler;
//   }

//   return async (...args: Parameters<V>): Promise<ReturnType<V>> => {
//     const transformed = <Record<string, never>>(
//       plainToInstance<T, unknown>(params.schema!, args[0])
//     );

//     const errors = await validate(transformed, {
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       validationError: { target: false },
//     });
//     if (errors.length > 0) {
//       const constraints = getAllConstraints(errors);
//       throw new ValidationException(
//         constraints.map((c) => Object.values(c)).flat(),
//       );
//     }
//     return params.handler(transformed);
//   };
// }
