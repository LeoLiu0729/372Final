exports.getAllCategories = () => {
    const query = 'SELECT * FROM Categories';
    const stmt = db.prepare(query);
    return stmt.all();
};
