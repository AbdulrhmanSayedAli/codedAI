import { Router } from 'express';
import sendResponse from '../Utils/Response.js';
import {
  StatusCodes
} from 'http-status-codes';

import DBBuilder from '../../builder/DBBuilder.js';

const router = Router();

const dummyJson = {
  models: [
    {
      User: {
        columns: [
          {
            name: 'd2username1',
            type: 'char',

            properties: {
              null: true,
              blank: true,
              default: 'ss',
              max_length: 22,
              choices: ['ss', 'Aa'],
              related_name: 'S'
            }
          },
          {
            name: 'car',
            type: 'foreign_key',
            foreign_key: {
              to: 'Car',
              on_delete: 'CASCADE'
            }
          },
          {
            name: 'car2',
            type: 'one_to_one',
            one_to_one: {
              to: 'Car',
              on_delete: 'CASCADE'
            }
          }, {
            name: 'car3',
            type: 'many_to_many',
            many_to_many: {
              to: 'Car'
            }
          }
        ],
        timestambed: true,
        isuser: true,
        meta: {
          db_table: 'my_user_table',
          ordering: '-created',
          verbose_name: 'asdasd',
          verbose_name_plural: 'asdasd',
          abstract: false
        }
      }
    },
    {
      Car: {
        columns: [
          {
            name: 'model',
            type: 'char'
          }
        ]
      }
    }
  ]
};

router.get('/build', (req, res) => {
  try {
    sendResponse(res, { result: DBBuilder.build(dummyJson) }, StatusCodes.OK);
  } catch (error) {
    sendResponse(res, { message: error.message }, StatusCodes.BAD_REQUEST);
  }
});

export default router;
