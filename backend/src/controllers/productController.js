import prisma from '../config/prisma.js';
import { getCache, setCache, invalidateCache } from '../services/cacheService.js';

export const getProducts = async (req, res, next) => {
  try {
    const cacheKey = 'products:all';
    const cached = await getCache(cacheKey);
    if (cached) return res.json(cached);

    const { brand, concentration, search } = req.query;
    const where = {};
    if (brand && brand !== 'all') where.brand = brand;
    if (concentration && concentration !== 'all') where.concentration = concentration;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({ where });
    await setCache(cacheKey, products, 60);
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const validated = productSchema.parse(req.body);
    const product = await prisma.product.create({ data: validated });
    await invalidateCache('products:*');
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const validated = productSchema.parse(req.body);
    const product = await prisma.product.update({ where: { id }, data: validated });
    await invalidateCache('products:*');
    res.json(product);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    await prisma.product.delete({ where: { id } });
    await invalidateCache('products:*');
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};