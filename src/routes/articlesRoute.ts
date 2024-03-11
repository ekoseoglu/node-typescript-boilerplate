import ArticlesController from '../controllers/articlesController.js';
import { Router } from 'express';
import schemaValidator from '../utilities/schemaValidator.js';

const articlesRoute = (router: Router): void => {
  router.get('/articles', ArticlesController.getArticles);
  router.post('/articles', schemaValidator('/articles/createArticle'), ArticlesController.createArticle);
  router.put('/articles/:articleId', ArticlesController.updateArticle);
  router.delete('/articles/:id', ArticlesController.deleteArticle);
};

export default articlesRoute;
