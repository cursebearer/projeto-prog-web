const isTest = process.env.NODE_ENV === 'test';
 // console.log('Conectando ao banco:', isTest ? 'healthenv_test' : 'healthenv');

export default {
  dialect: "postgres",
  host: "localhost",
  port: isTest ? 5433 : 5432,
  logging: false,
  username: "healthenv",
  password: "healthenv",
  database: isTest ? "healthenv_test" : "healthenv",
};