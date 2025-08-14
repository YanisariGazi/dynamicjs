db.auth('tsabit', 'tsabit'); // Autentikasi sebagai root user yang dibuat di docker-compose.yml

db.getSiblingDB('dynamic_controller').createUser({
    user: 'dynamic_controller',
    pwd: 'dynamic_controller',
    roles: [ { role: 'readWrite', db: 'dynamic_controller' } ]
});