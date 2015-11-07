'use strict';

import express from 'express';
import data from '../db/data';
import util from 'util';

var router = express.Router();
router.get('/notes', noteList);
router.get('/notes/:id', noteDetail);
router.get('/dictionary', dictionaryList);
router.post('/notes', addNote);
router.put('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);


function showSuccess(res, body) {
  var resp = {'status': 'OK', 'body': body};
  res.status(200).send(resp);
}

function fetchValidation(req, res) {
  var errors = req.validationErrors();
  if (errors) {
    var mes = 'There have been validation errors: ' + util.inspect(errors);
    throw mes;
  }else
  return true;
}

function noteUpdateValidation(req, res) {
  req.sanitizeBody();
  req.checkBody('en', 'Invalid en text').notEmpty();
  req.checkBody('cs', 'Invalid cs text').notEmpty();
  return fetchValidation(req, res);
}

function noteDetailValidation(req, res) {
  req.sanitizeParams();
  req.checkParams('id', 'Invalid id').notEmpty().isInt();
  return fetchValidation(req, res);
}

function findNoteById(res, id) {
  var note = data.notes[id];
  if (note)
    return note;
  else
    throw 'Note with id ' + id + ' not found';
}

function noteList(req, res, next) {
  showSuccess(res, data.notes);
}

function noteDetail(req, res, next) {
  var id = 0, note = {};
  noteDetailValidation(req, res);
  id = parseInt(req.params.id, 10);
  note = findNoteById(res, id);
  showSuccess(res, note);
}

function dictionaryList(req, res, next) {
  showSuccess(res, data.dictionary);
}

function addNote(req, res, next) {
  noteUpdateValidation(req, res);
  var note = req.body;
  data.notes.push(note);
  showSuccess(res, data.notes);
}

function updateNote(req, res, next) {
  noteDetailValidation(req, res);
  noteUpdateValidation(req, res);
  var id = 0, newNote = {};
  id = parseInt(req.params.id, 10);
  findNoteById(res, id);
  newNote = req.body;
  data.notes[id] = newNote;
  showSuccess(res, newNote);
}

function deleteNote(req, res, next) {
  noteDetailValidation(req, res);
  var id = 0;
  id = parseInt(req.params.id, 10);
  findNoteById(res, id);
  data.notes.splice(id, 1);
  showSuccess(res, data.notes);
}

export default router;
