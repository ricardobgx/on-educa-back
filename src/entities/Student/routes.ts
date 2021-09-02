import { Router } from 'express';

import CreateStudentController from './Controllers/Create/implementation';

const router = Router();

router.get('/',);
router.get('/',);
router.post('/', CreateStudentController.handle);
router.put('/',);
router.delete('/',);

export default router;