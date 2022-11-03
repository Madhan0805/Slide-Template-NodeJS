const { response, request } = require("express");
const SlidesModel = require("../models/SlideModel");

const SlideController = {
  addNewSlide: async (request, response) => {
    let file = request.file;

    if (file === undefined || file === null) {
      response.send({
        status: false,

        message: "file is not uploaded , try again",
      });
    } else {
      try {
        let filepath = "images/" + file.filename;

        let newSlide = new SlidesModel({ image: filepath });

        let result = await newSlide.save();

        if (result === null) {
          response.status(200).send({
            status: false,

            message: "file is not uploaded, try again",
          });
        } else {
          response

            .status(200)

            .send({ status: true, message: "new slide created successfully" });
        }
      } catch (error) {
        response.status(500).send({
          status: false,

          error,
        });
      }
    }
  },

  getSlides: async (request, response) => {
    try {
      let result = await SlidesModel.find();
      response.send({
        status: true,
        slides: result,
      });
    } catch (error) {
      response.status(500).send({
        status: false,
        error,
      });
    }
  },
  // createnewtemplate: async (request, response) => {
  //   let { name, image, slideCount } = request.body;
  //   try {
  //     let newTemplate = new SlidesModel({
  //       name: name,
  //       image: image,
  //       slideCount: slideCount,
  //     });
  //     let result = await newTemplate.save();
  //     if (result === null) {
  //       respond.status(200).send({
  //         status: false,
  //         message: "unable to save",
  //       });
  //     } else {
  //       response.status(200).send({ status: true, result });
  //     }
  //   } catch (error) {
  //     response.status(500).send({
  //       status: false,
  //       error,
  //     });
  //   }
  // },
};

module.exports = SlideController;
