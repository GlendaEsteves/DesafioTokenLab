const express = require('express');
const router = express.Router();
const Events = require('../models/Event');

router.get('/', (req, res) => {
  try {
    Events.find().exec((error, events) => {
      if (error) res.status(500).send({ message: 'Não foi possível buscar eventos' })
      else res.status(200).send(events)
    });
  } catch {
    res.status(500).send({ message: 'Houve um erro no servidor' });
  }
});

router.post('/', (req, res) => {
  try {
    const { name, description, start, end, date } = req.body;
    const event = new Events({
      name,
      description,
      start,
      end,
      date
    });

    event.save((error, eventCreated) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(201).send(eventCreated);
      }
    })
  } catch {
    res.status(500).send({ message: 'Houve um erro no servidor' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const id = req.params.id;
    Events.findById(id, (error, event) => {
      if (error) res.status(500).send(error)
      else if (!event) res.status(404).send({ message: 'Evento não encontrado' })
      else {
        const { name, description, start, end, date } = req.body;


        Events.updateOne({ _id: id }, {
          $set: {
            name, description, start, end, date
          }
        }, (err, newEventUpdated) => {
          if (err) res.status(500).send({ message: 'Não foi possível atualizar este evento', err })
          else res.status(200).send(newEventUpdated)
        })
      }
    })
  } catch {
    res.status(500).send({ message: 'Houve um erro no servidor' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const events = await Events.find({ _id: id }).exec();
    if (events.length) {
      await Events.deleteOne({ _id: id });
      res.status(200).send({});
    }
  } catch {
    res.status(500).send({ message: 'Houve um erro no servidor' });
  }
});

module.exports = router;