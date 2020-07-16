exports.Login = (email, pass) =>
{
var sql = 
`SELECT ID
FROM weather.users
WHERE email = '${email}' and password = '${pass}'
`;
return sql;
};

exports.Register = (email, pass) =>
{
var sql = 
`INSERT INTO weather.users (Email, Password) Values ('${email}', '${pass}'); insert into weather.data (userId, sunTime, waterIntake, totalProgress) values (LAST_INSERT_ID(), 0,0,0)`;
return sql;
};

exports.Save = (userId, sun, water, progress) =>
{
var sql = 
`UPDATE weather.data 
SET SunTime = ${sun},
 WaterIntake = ${water}, 
 TotalProgress = ${progress}
WHERE UserId = ${userId};`;
return sql;
};

exports.Fetch = (userId) =>
{
var sql = 
`SELECT SunTime, WaterIntake, TotalProgress FROM weather.data WHERE UserID = ${userId};`;
return sql;
};
