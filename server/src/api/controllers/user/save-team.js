import { Player, Team } from "../../../models/index.js";
import { getText } from "../../../utils/index.js";

export default async (req, res) => {
  const payload = req.body;
  const {
    players,
    matchId: match_id,
    userId: user_id,
    captainId: captain_id,
    vicecaptainId: vice_captain_id,
  } = payload;

  try {
    // Create an array of Player instances
    const playerInstances = players.map((playerData) => new Player(playerData));

    // Create a new Team instance
    const teamInstance = new Team({
      players: playerInstances,
      // Include other fields from the payload if needed
      match_id,
      captain_id,
      vice_captain_id,
      user_id,
    });

    // Save the new Team instance to the database
    const savedTeam = await teamInstance.save();
    console.log("Team saved to the database:", savedTeam);

    return res.status(200).json({
      resultMessage: { en: getText("en", "00093") },
      code: "00093",
    });
  } catch (error) {
    console.error("Error creating teams:", error);
  }
};

/**
 * @swagger
 * /user:
 *    get:
 *      summary: Get User Info
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: The user information has gotten successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          code:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          user:
 *                              $ref: '#/components/schemas/User'
 *        "401":
 *          description: Invalid token.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
