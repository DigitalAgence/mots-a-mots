migrate((app) => {
  const users = app.findCollectionByNameOrId('users');
  let existing;
  try { existing = app.findCollectionByNameOrId('dictee_progress'); } catch (_) { /* New collection. */ }
  if (existing) return;
  const collection = new Collection({
    name: 'dictee_progress', type: 'base',
    listRule: '@request.auth.id != "" && owner = @request.auth.id',
    viewRule: '@request.auth.id != "" && owner = @request.auth.id',
    createRule: '@request.auth.id != "" && @request.body.owner = @request.auth.id',
    updateRule: '@request.auth.id != "" && owner = @request.auth.id && @request.body.owner:changed = false',
    deleteRule: '@request.auth.id != "" && owner = @request.auth.id',
    fields: [
      { name: 'owner', type: 'relation', required: true, maxSelect: 1, collectionId: users.id, cascadeDelete: true },
      { name: 'data', type: 'json', required: true, maxSize: 3000000 },
      { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
      { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
    ],
    indexes: ['CREATE UNIQUE INDEX idx_dictee_progress_owner ON dictee_progress (owner)'],
  });
  app.save(collection);
}, (app) => { app.delete(app.findCollectionByNameOrId('dictee_progress')); });
