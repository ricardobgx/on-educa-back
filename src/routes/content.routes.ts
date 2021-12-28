/**
 * @swagger
 * components:
 *   schemas:
 *     NewContent:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Título do conteúdo.
 *           example: Equação do segundo grau.
 *         description:
 *           type: string
 *           description: Descrição do conteúdo.
 *           example: Nesse conteúdo você irá aprender sobre equações do segundo grau.
 *         video:
 *           type: string
 *           description: Link da videoaula do conteúdo.
 *           example: https://www.youtube.com/watch?v=aKaMQwvwnR4
 *         index:
 *           type: integer
 *           description: Posição do conteúdo para ordenação.
 *           example: 1
 *         unityId:
 *           type: string
 *           description: ID da unidade que o conteúdo pertence.
 *           example: bc72e142-8325-4ecd-a2e1-d56ec09a8216
 *     Content:
 *       allOf:
 *         - $ref: '#/components/schemas/NewContent'
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: ID do contato.
 *               example: 0
 *             createdAt:
 *               type: string
 *               description: Data no formato ISO em que o contato foi registrado.
 *               example: 2021-07-08T18:08:19.965Z
 *             updatedAt:
 *               type: string
 *               description: >
 *                 Data no formato ISO em que o contato foi atualizado pela última vez.
 *               example: 2021-07-08T18:08:19.965Z
 */

import { Router } from 'express';
import CreateContentController from '../controllers/content/CreateContentController';
import DeleteContentController from '../controllers/content/DeleteContentController';
import ListContentByUnityController from '../controllers/content/ListContentByUnityController';
import ListContentController from '../controllers/content/ListContentController';
import ShowContentController from '../controllers/content/ShowContentController';
import UpdateContentController from '../controllers/content/UpdateContentController';

const routes = Router();

/**
 * @swagger
 * /contents:
 *   get:
 *     summary: Recupera a lista de conteúdos.
 *     tags:
 *      - Content
 *     description: Recupera a lista de contatos da agenda. Pode ser usado sem autenticação.
 *     responses:
 *       200:
 *         description: Uma lista de conteúdos.
 *         content:
 *           application/json:
 *             schema:
 *               properties:
 *                 conteúdos:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Content'
 */
routes.get('/', ListContentController.handle);
routes.get('/unity/:id', ListContentByUnityController.handle);
routes.get('/:id', ShowContentController.handle);
routes.post('/', CreateContentController.handle);
routes.put('/:id', UpdateContentController.handle);
routes.delete('/:id', DeleteContentController.handle);

export default routes;
