import sanitizeHtml from 'sanitize-html';
import xss from 'xss-clean';

export const sanitizeInput = (req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeHtml(req.body[key], {
          allowedTags: [],
          allowedAttributes: {},
        });
      } else if (Array.isArray(req.body[key])) {
        req.body[key] = req.body[key].map((item) =>
          typeof item === 'string' ? sanitizeHtml(item, { allowedTags: [], allowedAttributes: {} }) : item
        );
      }
    }
  }
  next();
};

export const xssProtection = xss();