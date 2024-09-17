import { body } from "express-validator";

export const loginValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
];

export const registerValidator = [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('fullName').isLength({ min: 3 }),
    body('avatarUrl').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тегов').optional().isString(),
    body('imageUrl').optional().isString(),
];