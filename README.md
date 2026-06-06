# React Task Manager

Applicazione demo: Task Manager con frontend React + Vite e backend Express.

## Funzionalità principali

- Lista task in tabella con `React.memo()` per ottimizzare i row.
- Routing client-side con React Router:
  - `/` → elenco task
  - `/task/:id` → dettaglio task
- Global state centralizzato con `GlobalContext` e hook personalizzato `useTasks()`.
- `useTasks.js` usa `useReducer` e `tasksReducer.js` per gestire lo stato dei task.
- API CRUD:
  - `GET /api/tasks`
  - `POST /api/tasks`
  - `PUT /api/tasks/:id`
  - `DELETE /api/tasks/:id`
- Validazione duplicati sul nome task per `addTask` e `updateTask`.
- Ordinamento dinamico della tabella per titolo, stato e data.
- Ricerca task per nome con debounce.
- Selezione multipla dei task e cancellazione bulk con `Promise.allSettled()`.
- `dayjs` per formattare le date in italiano `DD/MM/YYYY`.
- Modal riutilizzabile (`Modal.jsx`) per conferme e modale di modifica.

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
- `src/useTasks.js` — hook che usa `useReducer` per gestire i task.
- `src/tasksReducer.js` — reducer per le azioni dei task.
- `src/TaskList.jsx` — tabella task con ricerca, ordinamento e selezione multipla.
- `src/TaskRow.jsx` — riga task con checkbox e formattazione data.
- `src/TaskDetail.jsx` — dettaglio task con visualizzazione e modifiche.
- `src/EditTaskModal.jsx` — form di modifica task dentro la modale.
- `src/Modal.jsx` — wrapper modale riutilizzabile con overlay.
- `src/index.css` — stili globali, tabella, modali e form.

## Stato attuale

- Lista task funzionante con caricamento da backend.
- Ordinamento per titolo, stato e data attivo.
- Ricerca con debounce per filtri in tempo reale.
- Selezione multipla e `Elimina Selezionate` con cancellazione parallelizzata.
- Duplicati nome task gestiti in creazione e modifica.
- Date visualizzate in formato italiano `DD/MM/YYYY`.

## Note utili

- Se non vedi i task, verifica che il backend Express sia avviato su `localhost:3001` e che il dev server Vite stia usando `http://localhost:5175`.
- La route `/tasks/:id` viene gestita come redirect verso `/task/:id` per evitare conflitti con la proxy API.
- Se salti l'installazione di `dayjs`, esegui `npm install` nella root del progetto.
- Per miglioramenti futuri: aggiungere loading/error UI, autorizzazioni, ordinamento su più colonne e paginazione.

## Cos'è questo progetto

Un Task Manager completo che permette di:

- **Visualizzare** una lista di task da un backend Express
- **Cercare** task per nome con debounce per ottimizzare le prestazioni
- **Ordinare** i task cliccando sulle intestazioni (titolo, stato, data)
- **Selezionare** più task contemporaneamente tramite checkbox
- **Eliminare** task singolarmente o in blocco con `Promise.allSettled()`
- **Visualizzare** il dettaglio di un task con formattazione della data
- **Modificare** un task tramite modale con validazione duplicati
- **Creare** nuovi task con controllo su nomi duplicati

## Architettura e decisioni tecniche

### Backend
- Express server in `react-task-manager-back` su porta 3001
- API CRUD su `/tasks` (GET, POST, PUT, DELETE)

### Frontend React
- **Routing**: React Router con `/`, `/task/:id`, `/about`, `/products`
- **Proxy**: Vite proxy su `/api/tasks` verso backend per evitare conflitti di routing
- **Global State**: `GlobalContext` + `useReducer` per centralizzare la gestione dei task
- **Reducer**: `tasksReducer.js` gestisce tutte le azioni (LOAD, ADD, REMOVE, UPDATE, REMOVE_MULTIPLE)
- **Hook**: `useTasks()` incapsula tutte le logiche API e dispatches al reducer

### Ottimizzazioni
- `React.memo()` su TaskRow per evitare re-render inutili
- `useMemo()` in TaskList per ordinamento e filtro calcolati solo se dipendenze cambiano
- `useCallback()` per debounce della ricerca
- Validazione duplicati nome task prima della chiamata API
- `Promise.allSettled()` per cancellazioni parallele senza interrompere il flusso

### Formattazione e UX
- `dayjs` per date formattate in italiano `DD/MM/YYYY`
- Ricerca con debounce (300ms)
- Ordinamento bi-direzionale con frecce `↑` e `↓`
- Selezione multipla con checkbox e highlight riga
- Modal riutilizzabile per confirma e modifica

## File principali e loro ruolo

| File | Ruolo |
|------|-------|
| `src/App.jsx` | Setup routing e struttura globale |
| `src/GlobalContext.jsx` | Provider del contesto globale |
| `src/useTasks.js` | Hook con logica API e reducer dispatch |
| `src/tasksReducer.js` | Funzione reducer per gestire lo stato |
| `src/TaskList.jsx` | Tabella con ricerca, ordinamento, selezione |
| `src/TaskRow.jsx` | Riga singola task con checkbox |
| `src/TaskDetail.jsx` | Pagina dettaglio task |
| `src/EditTaskModal.jsx` | Form modifica task in modale |
| `src/Modal.jsx` | Componente modale riutilizzabile |
| `src/index.css` | Stili globali |



