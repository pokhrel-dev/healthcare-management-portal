# Healthcare Management Portal (HMP)
**A Comprehensive Enterprise Solution for Healthcare Data & Patient Management**

### Executive Summary
This portal is a full-stack monorepo designed for high-integrity healthcare data management. It leverages a modern **React-Django-PostgreSQL** stack, containerized with Docker and governed by a rigorous GitHub Actions CI/CD pipeline.

An Enterprise-Ready Healthcare Data Management SystemExecutive Summary The project is a full-stack monorepo that can be used to manage patients and providers in a scalable way. It is based on a contemporary React-Django-PostgreSQL stack, containerized with Docker and managed by a strict GitHub Actions CI/CD flow.🏗 System ArchitectureThe diagram below shows a functional separation of the HMS ecosystem, which emphasizes the communication between the decoupled frontend and the containerized backend services.Infrastructure & DevOps: Orchestrated with Docker Compose locally and using GitHub Actions to verify on the cloud.Frontend Development (React): A component-based interface based on React 18, with Doctor and Patient-specific dashboards.Backend Development (Django): A Python 3.13 REST API layer with JWT authentication, migrations, and business logic.Persistence Layer: PostgreSQL 15 will offer a relational data integrity to all the records related to patients and appointments.🛠 Core Tech Stack backend Python 3.13 / Django / REST FrameworkFrontend React 18 / Node 18DatabasePostgreSQL 15CI/CD GitHub Actions (YAML)
|human|>|human|>|human|>- .github/workflows/ock
├── backend/core/ Django Settings and Manage.pyanage.py
├── backend/appointments/ # Micro-service logic to schedule.
├── frontend/ source of React application.ation source
└── docker-compose.yml    # Local Orchestration
🚦 Development Standards & CI/CDTo ensure the integrity of the system, this repository implements a Pull Request (PR) Workflow:Direct Pushes Forbidden: The master branch is secured to maintain the quality of code.Automated Gatekeeping: Each PR will spin up a PostgreSQL inside a GitHub Action, run the migrations, and build the React production bundle.Zero-Warning Policy: Builds are set to regard warnings as errors so as to make linting correct.Merge Requirement: The merge button is only activated when there is a successful green build. PowerShell# 1 Local Setup. Clone and Initialize
git clone <repo-url>

# 2. Boot Infrastructure
docker-compose up --build

# 3. Install Migrations (when not running in Docker)
cd backend/core
python manage.py migrate
🗺 Roadmap (Next Implementation Blocks)Dashboard Extension: Adding role-based Medical Staff and Patient views.Automated Testing: Backend (PyTest) and frontend (Jest) component integration.Data Engineering: Silver/Platinum data expansion to support advanced healthcare analytics.