import Meetup from '../models/Meetup';
import File from '../models/File';

class OrganizingController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const userMeetups = await Meetup.findAll({
      where: { user_id: req.userId },
      order: ['date'],
      limit: 7,
      offset: (page - 1) * 7,
      include: [
        {
          model: File,
          attributes: ['path', 'url'],
        },
      ],
    });

    return res.json(userMeetups);
  }
}

export default new OrganizingController();
