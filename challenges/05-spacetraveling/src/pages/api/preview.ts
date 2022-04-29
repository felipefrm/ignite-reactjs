import * as prismicNext from "@prismicio/next";

import { getPrismicClient, linkResolver } from "../../services/prismic";

export default async function handler(req, res) {
  const client = getPrismicClient({ req });

  prismicNext.setPreviewData({ req, res });

  await prismicNext.redirectToPreviewURL({ req, res, client, linkResolver });
}