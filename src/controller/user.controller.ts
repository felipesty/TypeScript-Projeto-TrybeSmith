import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service';

const secret = 'seusecretdetoken';
class UserController {
  constructor(private userService = new UserService()) {}

  public create = async (req: Request, res: Response) => {
    const user = req.body;
    const token = jwt.sign({ user }, secret, { expiresIn: '7d',
      algorithm: 'HS256' });

    const userCreated = await this.userService.create(user);
    if (!userCreated) return res.status(400).json('erro');
    res.status(201).json({ token });
  };
}

export default UserController;