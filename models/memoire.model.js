const mongoose = require('mongoose');

const MemoireSchema = new mongoose.Schema(
    {

        namefaculte: {
            type: String,
            trim: true,
            maxlength: 500,
            required: true
        },
        couverture: {
            type: Object,
        },

        depaterments: {
            type: [
                {
                    nameDepartement: String,
                    couvertureDepartement: Object,
                    memoires: {
                        type: [
                            {
                                appartenant: String,
                                sujet: String,
                                fileMemoire: Object,
                                timestamp: Number
                            }


                        ]
                    },
                    timestamp: Number,
                }
            ],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('memoire', MemoireSchema);