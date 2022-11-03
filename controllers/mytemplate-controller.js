const { response } = require("express");
const MyTemplateModel = require("../models/MyTemplateModel");

const myTemplateController = {
  home: (request, response) => {
    response.send("SLIDE TEMPLATE APP GET");
  },
  getMyTemplateList: async (request, response) => {
    let result = await MyTemplateModel.find();
    let sendData = {
      status: true,
      myTemplate: result,
    };
    response.send(sendData);
  },
  getMyTemplateDetailsById: async (request, response) => {
    let { id } = request.params;
    try {
      let result = await MyTemplateModel.findById(id);
      if (result) {
        response.status(200).send({
          status: true,
          result,
        });
      } else {
        response.status(200).send({
          status: false,
          message: "Template not found",
        });
      }
    } catch (error) {
      response.status(500).send({
        status: false,
        error,
      });
    }
  },
  createNewTemplate: async (request, response) => {
    let { name, slides, slidesCount, user_id } = request.body;
    let { id } = response.user;
    try {
      let newTemplate = new MyTemplateModel({
        name: name,
        slides: slides,
        slidesCount: slidesCount,
        user_id: id,
      });
      let result = await newTemplate.save();
      if (result === null) {
        response.status(500).send({
          status: false,
          message: "unable to save template, try again",
        });
      } else {
        response.status(200).send({
          status: true,
          message: "Slide Created Successfully",
        });
      }
    } catch (error) {
      response.status(500).send({
        status: false,
        error,
      });
    }
  },
  deleteMyTemplate: async (request, response) => {
    var data = request.query;
    let { id } = response.user;
    try {
      let result = await MyTemplateModel.deleteOne({
        _id: data.mtid,
        user_id: id,
      });
      if (result.deletedCount > 0) {
        response.status(200).send({
          status: true,
          message: "my template deleted successfully",
        });
      } else {
        response.status(200).send({
          status: false,
          message: "record not found to delete",
        });
      }
    } catch (error) {
      response.status(500).send({
        status: false,
        error,
      });
    }
  },
  updateMyTemplate: async (request, response) => {
    let { name, slides, slidesCount, _id } = request.body;
    let { id } = response.user;
    try {
      let result = await MyTemplateModel.updateOne(
        { _id: _id, user_id: id },
        { name: name, slides: slides, slidesCount: slidesCount }
      );
      if (result.modifiedCount > 0) {
        response.status(200).send({
          status: true,
          message: "Record Update Successfully",
        });
      } else {
        response.status(200).send({
          status: true,
          message: "Record is Up toDate",
        });
      }
    } catch (error) {
      response.status(500).send({
        status: false,
        error,
      });
    }
  },
};

module.exports = myTemplateController;
