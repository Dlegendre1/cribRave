# Build Image 1 - using node:18-alpine. Call it 'backend'

# Create a folder called 'backend' that will take all the following commands

# Copy our local backend package.json into the backend folder

# Install node_modules into the backend folder

# Copy our local backend code into the docker backend folder


# -------------------------------

# Build image 2 - using node:18-alpine. Call it 'frontend'

# Create a folder called 'frontend' that will take all the following commands

# Copy the local frontend package.json into the frontend folder

# Install node_modules into the frontend folder

# Copy our local frontend code into the frontend folder

# Build our production level code (npm run build)



# -------------------------

# Build image 3 - Production level code. Use node:18-alpine. Call it 'production'


# Create environment variables for everything in the .env.example file (found locally in backend/.env)

# Create an argument for NODE_ENV
# Create an ENV variable for NODE_ENV, use the ARG from the previous line

# Create an argument for SCHEMA
# Create an ENV variable for SCHEMA, use the ARG from the previous line



# Create an argument for DATABASE_URL
# Create an ENV variable for DATABASE_URL, use the ARG from the previous line


# Create an argument for JWT_SECRET
# Create an ENV variable for JWT_SECRET, use the ARG from the previous line


# 1 week JWT. Pre-filled in to avoid having to do this in render
ARG JWT_EXPIRES_IN=60400
ENV JWT_EXPIRES_IN=${JWT_EXPIRES_IN}

# Create a folder called 'var/www' that will take all the following commands

# copy the backend/package.json into the var/www folder
# copy the backend/sequelizerc file into the var/www folder

# Copy the dist from our frontend image into the var/www/frontend/dist folder (HINT: This will also create a folder for us)

# Run our install, but only the production (will not install and -DEV deps)

# copy the backend from our backend image, and copy it into our var/www/backend folder (HINT: this will also create a folder for us)

# copy the local ROOT package.json into our var/www


# Expose our port 8000, because that is what our backend will link to

# Create a start command using npm start
