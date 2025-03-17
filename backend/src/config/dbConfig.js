export default {
  dialect: "postgres",
  host: "localhost", 
  username: "user",
  password: "password",
  database: "healthenv",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};