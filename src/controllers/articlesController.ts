import { NextFunction, Request, Response } from 'express';

class ArticlesController {

// GET ALL ARTICLES
  static getArticles(req: Request, res: Response, next: NextFunction): void{
    console.log('getArticles');
    res.json({ success: true, msg: 'GET all articles' });
  }

  // CREATE ARTICLE
  static createArticle(req: Request, res: Response, next: NextFunction): void {
    console.log('createArticle');
    res.json({ success: true, msg: 'POST new article' });
  }

  // UPDATE ARTICLE
  static updateArticle(req: Request, res: Response, next: NextFunction): void{
    console.log('updateArticle');
    res.json({ success: true, msg: 'PUT article' });
  }

  // DELETE ARTICLE
  static deleteArticle(req: Request, res: Response, next: NextFunction): void{
    console.log('deleteArticle');
    res.json({ success: true, msg: 'DELETE article' });
  }
}

export default ArticlesController;
