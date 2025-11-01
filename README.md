# 🧾 Stripe Payment Integration App

A full-stack web application integrated with **Stripe** to accept secure **one-time Checkout payments** and **recurring Subscriptions**.  
Built with a modular architecture — React frontend and Node.js (Express) backend — for clean separation and easy deployment.

---

## 🚀 Features

- 💳 **Stripe Checkout** – Seamless one-time payment flow  
- 🔁 **Subscription Payments** – Support for recurring plans  
- 🧱 **Full-stack Setup** – Separate `frontend/` and `backend/` folders  
- 🔐 **Environment Variables** support via `.env`  
- 🧰 **Setup & Stop Scripts** for automated installation and startup  
- 📜 **Demo/Test Cards** included for easy sandbox testing  

---

## 📂 Project Structure

```
stripe_app/
│
├── frontend/         # React + Ant Design UI
│   ├── src/
│   └── package.json
│
├── backend/          # Node.js (Express) server with Stripe integration
│   ├── server.js
│   └── package.json
│
├── setup.sh          # Script to install & start everything
├── stop.sh           # Script to stop all running servers
└── README.md
```

---

## ⚙️ Prerequisites

Before running the project, make sure you have:

- 🟢 **Node.js 20+** (automatically handled by `setup.sh`)
- 🌀 **NVM (Node Version Manager)** – installed if missing
- 🧾 **Stripe Account** – [Create one here](https://dashboard.stripe.com/register)
- 🔑 A `.env` file in the backend with your credentials:
  ```bash
  STRIPE_SECRET_KEY=sk_test_your_key_here
  ```

---

## 🧠 Setup Instructions

To automatically install dependencies and start both servers:

```bash
chmod +x setup.sh
./setup.sh
```

This script will:
- Install Node 20 (via NVM if missing)
- Install frontend and backend dependencies
- Start both servers:
  - Frontend → [http://localhost:5173](http://localhost:5173)
  - Backend → [http://localhost:5000](http://localhost:5000)

---

## 🛑 Stop Servers

When you’re done, stop everything with:
```bash
chmod +x stop.sh
./stop.sh
```

This kills any running process on:
- Port **5173** (frontend)
- Port **5000** (backend)

---

## 🧪 Testing Payments (Stripe Test Cards)

You can simulate payments using Stripe test cards.  
Use this universal test card for successful transactions:

```
Card Number: 4242 4242 4242 4242
Expiry Date: Any future date (e.g., 12/34)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (optional)
```

More test cards → [Stripe Docs: Test Cards](https://stripe.com/docs/testing#international-cards)

---

## 📜 Example API Endpoints

| Endpoint | Method | Description |
|-----------|--------|-------------|
| `/create-checkout-session` | POST | Creates a Stripe Checkout Session |
| `/checkout-payments` | GET | Lists all completed or pending payments |

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React, Ant Design, Axios |
| **Backend** | Node.js, Express, Stripe SDK |
| **Payment Gateway** | Stripe |
| **Runtime** | Node 20 via NVM |

---

## 🧰 Development Notes

- UI pagination handled client-side using Ant Design Table.  
- Environment variables are injected using `dotenv`.  
- Make sure backend `.env` is not committed — it’s in `.gitignore`.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and modify it.

---

## ❤️ Contributing

Pull requests are welcome!  
If you’d like to contribute:
1. Fork the repo  
2. Create a feature branch  
3. Submit a pull request  