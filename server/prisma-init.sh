
#!/bin/bash

# Wait until MySQL is ready
./wait-for-it.sh db_postgres:5432 --timeout=60 --strict -- echo "Postgres setup"

# Run Prisma commands
yarn prisma migrate deploy

# Execute the main application
exec "$@"
