const Doctor = require("../models/Doctor");
const { Op } = require("sequelize");

exports.getDoctors = async (req, res) => {
  try {
    let {
      specialization,
      search,
      availability,
      page = 1,
      limit = 10,
    } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    if (page <= 0 || limit <= 0) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive numbers",
      });
    }

    const whereClause = {};

    if (specialization) {
      whereClause.specialization = specialization;
    }

    if (search) {
      whereClause.fullName = {
        [Op.like]: `%${search}%`,
      };
    }

    if (availability !== undefined) {
      whereClause.availability = availability === "true";
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Doctor.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      attributes: [
        "id",
        "fullName",
        "specialization",
        "experience",
        "consultationFee",
        "availability",
      ],
    });

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No doctors found",
      });
    }

    res.status(200).json({
      success: true,
      totalDoctors: count,
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      data: rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};