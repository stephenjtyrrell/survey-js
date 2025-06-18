export const surveyJson = {
  "title": "NPS Survey Question",
  "logo": "https://surveyjs.io/Content/Images/examples/logo.png",
  "logoHeight": "60px",
  "completedHtml": "<h3>Thank you for your feedback</h3>",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "rating",
          "name": "nps_score",
          "title": "On a scale of zero to ten, how likely are you to recommend our product to a friend or colleague?",
          "isRequired": true,
          "rateCount": 11,
          "rateMin": 0,
          "rateMax": 10,
          "minRateDescription": "(Most unlikely)",
          "maxRateDescription": "(Most likely)"
        },
        {
          "type": "checkbox",
          "name": "promoter_features",
          "title": "Which of the following features do you value the most?",
          "description": "Please select no more than three features.",
          "isRequired": true,
          "validators": [
            {
              "type": "answercount",
              "text": "Please select no more than three features.",
              "maxCount": 3
            }
          ],
          "choices": [
            "Performance",
            "Stability",
            "User interface",
            "Complete functionality",
            "Learning materials (documentation, demos, code examples)",
            "Quality support"
          ],
          "showOtherItem": true,
          "otherText": "Other features:",
          "colCount": 2
        },
        {
          "type": "comment",
          "name": "passive_experience",
          "title": "What can we do to make your experience more satisfying?"
        },
        {
          "type": "comment",
          "name": "test_new_field",
          "title": "This is a test field",
        }
      ]
    }
  ],
  "headerView": "advanced"
};


