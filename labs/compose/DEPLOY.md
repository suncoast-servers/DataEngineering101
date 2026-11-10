# Deploy labs on a Hetzner (or any Linux) VPS

Same Compose files as local. **Do not** expose database ports to the public internet.

## Sizing

| Profile | RAM | CPU | Notes |
|---------|-----|-----|--------|
| `core` | 2 GB | 2 vCPU | Postgres + MinIO |
| `batch` | 4 GB | 2 vCPU | Adds Python ETL container |

## 1. Provision server

- Ubuntu 22.04 or 24.04 LTS.
- SSH key authentication only (disable password login when comfortable).

## 2. Install Docker

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo $VERSION_CODENAME) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
sudo usermod -aG docker "$USER"
```

Log out and back in so the `docker` group applies.

## 3. Clone and configure

```bash
git clone https://github.com/TheDevWhoSaysNI/DataEngineering101.git
cd DataEngineering101/labs/compose/core
cp .env.example .env
```

Edit `.env` with strong passwords (never commit `.env`).

## 4. Firewall

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
# Only if you terminate TLS on this host for MinIO console via reverse proxy:
# sudo ufw allow 443/tcp
sudo ufw enable
```

Bind Postgres to localhost only in production: set `ports` to `127.0.0.1:5432:5432` in a `docker-compose.override.yml` on the server.

## 5. Start

```bash
docker compose --profile core up -d
docker compose ps
```

Capstone batch (from `labs/compose/capstone-batch`):

```bash
docker compose --profile batch build
docker compose --profile batch up -d postgres minio
docker compose --profile batch run --rm etl
```

## 6. Access UIs safely

- **SSH tunnel** to MinIO console: `ssh -L 9001:127.0.0.1:9001 user@your-server`
- Open `http://localhost:9001` on your laptop.

## Troubleshooting

| Symptom | Check |
|---------|--------|
| `postgres` unhealthy | `docker compose logs postgres`; disk space; password in `.env` |
| Out of memory | `free -h`; reduce profiles; upgrade VPS |
| Port in use | Change `POSTGRES_PORT` / MinIO ports in `.env` |

## Optional: Suncoast managed VPS

Curriculum stays self-serve. Paid help installing this stack can be offered via **Suncoast Servers LLC** (see `docs/disclosure.md`).
