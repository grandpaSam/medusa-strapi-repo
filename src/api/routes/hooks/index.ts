import { Router } from "express";
import bodyParser from "body-parser";
import middleware from "../../middleware";
import { parseCorsOrigins } from "medusa-core-utils";
import cors from "cors";
import utils from "../../middleware/utils";
import { StrapiMedusaPluginOptions } from "../../../types/globals";
const strapiSignal = require("../../controllers/hooks/strapi-signal").default;

const hooksRouter = Router();
export default (app: Router, options: StrapiMedusaPluginOptions) => {
    app.use("/strapi/hooks", hooksRouter);

    const strapiUrl = `${options.strapi_protocol}://${options.strapi_host}:${options.strapi_port}`;

    // Authenticated routes
    // hooksRouter.use(middlewares.authenticate());

    // Calls all middleware that has been registered to run after authentication.

    const strapiCors = {
        origin: parseCorsOrigins(strapiUrl),
        credentials: true
    };

    /** todo additional checks to authenticate strapi request */
    hooksRouter.use(cors(strapiCors));
    hooksRouter.use(utils);
    /* hooksRouter.post(
        "/update-medusa",
        bodyParser.json(),
        middleware.wrap(updateMedusa)
    );*/

    /* hooksRouter.post("/seed", bodyParser.json(), middleware.wrap(seed));*/

    hooksRouter.post(
        "/strapi-signal",
        bodyParser.json(),
        middleware.wrap(strapiSignal)
    );
    return hooksRouter;
};
