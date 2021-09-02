import { Router } from 'express';

import CreateTeacherController from './Controllers/Create/implementation';

const router = Router();

router.get('/',);
router.get('/',);
router.post('/', CreateTeacherController.handle);
router.put('/',);
router.delete('/',);

export default router;