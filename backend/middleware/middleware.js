import { errorHandler } from "./errorHandler.js";
import { sessionConfig } from './sessionConfig.js'
import { logger } from "./logger.js";
import { requireAuth } from './requireAuth.js'
import { handleCors } from "../config/cors.js";
import { missingRoutes } from "./missingRoutes.js";
// import { currentUser } from './currentUser.js'

export {
    errorHandler,
    sessionConfig,
    logger,
    requireAuth,
    handleCors,
    missingRoutes,
    // currentUser
};