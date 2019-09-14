const handleNewsletter = (req, res, db) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json('incorrect form submission');
  }
  db.transaction(trx => {
    trx.insert({
      email: email
    })
    .into('newsletter')
    .returning('email')
    .then(registered => res.json(`${registered} has been registered!`))
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
	handleNewsletter: handleNewsletter
}