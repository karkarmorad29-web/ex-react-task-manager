# React Task Manager

Applicazione demo: Task Manager con frontend React + Vite e backend Express.

## Funzionalità principali

- Lista task in tabella con `React.memo()` per ottimizzare i row.
- Routing client-side con React Router:
  - `/` → elenco task
  - `/task/:id` → dettaglio task
- Bootstrap globale con `GlobalContext` per condividere `tasks`, `addTask`, `removeTask`, `updateTask`.
- Hook personalizzato `useTasks()` per gestire le chiamate API:
  - `GET /api/tasks`
  - `POST /api/tasks`
  - `PUT /api/tasks/:id`
  - `DELETE /api/tasks/:id`
- Modal riutilizzabile (`Modal.jsx`) per conferme e modale di modifica.
- Modale "Modifica Task" con form organizzato e stili aggiornati.

## Installazione

1. Clona il repository.
2. Installa le dipendenze frontend:

```bash
npm install
```

3. Avvia il backend Express nella cartella `react-task-manager-back`:

```bash
cd react-task-manager-back
npm install
npm start
```

4. Torna alla cartella principale e avvia il frontend:

```bash
cd ..
npm run dev
```

5. Apri il browser su `http://localhost:5175/`.

## Configurazione API

- Il frontend usa la proxy Vite su `/api/tasks` verso `http://localhost:3001/tasks`.
- Il file `.env` contiene l'endpoint:

```env
VITE_API_URL=/api/tasks
```

## File principali

- `src/App.jsx` — routing e struttura principale.
- `src/GlobalContext.jsx` — provider React che espone il contesto globale.
- `src/useTasks.js` — hook per caricamento e mutazione task.
- `src/TaskList.jsx` / `src/TaskRow.jsx` — visualizzazione tabellare dei task.
- `src/TaskDetail.jsx` — dettaglio di un singolo task con modifica e cancellazione.
- `src/EditTaskModal.jsx` — form di modifica task dentro la modale.
- `src/Modal.jsx` — wrapper modale riutilizzabile con overlay.
- `src/index.css` — stili globali e modali.

## Stato attuale

- Lista task funzionante con caricamento da backend.
- Dettaglio task disponibile su `/task/:id`.
- Eliminazione task con conferma modal implementata.
- Modale di modifica task con form e stile aggiornati.

## Note utili

- Se non vedi i task, verifica che il backend Express sia avviato su `localhost:3001` e che il dev server Vite stia usando `http://localhost:5175`.
- La route `/tasks/:id` viene gestita come redirect verso `/task/:id` per evitare conflitti con la proxy API.
- Per migliorare ulteriormente: aggiungere stati di loading, gestione degli errori in UI, e validazione avanzata dei campi.



