import { NextApiRequest, NextApiResponse } from "next";

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("bombando");
  return res.status(200).json({ msg: "Hello World" });
}
