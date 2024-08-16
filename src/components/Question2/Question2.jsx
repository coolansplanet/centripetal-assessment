import "./Question2.css";

const Question2 = () => {
  const intelligence = [
    {
      ioc: "1.2.3.4",
      threat: "low",
      countryCode: "us",
      seenBy: ["usSS", "whiteHatsAnon"],
      lastSeen: 1650309845083,
    },
    {
      ioc: "1.2.3.5",
      threat: "high",
      countryCode: "us",
      seenBy: ["usSS"],
      lastSeen: 1650307825088,
    },
    {
      ioc: "gougle.com",
      threat: "high",
      countryCode: "ca",
      seenBy: ["usSS", "whiteHatsAnon", "ruWatch", "privateInc", "angiesList"],
      lastSeen: 1650609845087,
    },
    {
      ioc: "goople.com",
      threat: "high",
      countryCode: "ru",
      seenBy: ["usSS", "whiteHatsAnon", "angiesList"],
      lastSeen: 1650109815283,
    },
  ];

  const generateReport = (list = []) => {
    const meaningfulFields = ["threat", "countryCode"];
    /*
     Note from Herman:
        'ioc', 'lastSeen', and 'seenBy' are irrelevant values for this kind of report.
        That's why I won't include those.
    */
    const valueCount = {};

    meaningfulFields.forEach(
      (oneMeaningfulField) => (valueCount[oneMeaningfulField] = {})
    );

    list.forEach((oneItem) => {
      meaningfulFields.forEach((oneMeaningfulField) => {
        /*
            Note from Herman:
                yep, I know this is a quadratic one. However,
                as this iteration is going to loop for a few fields only, this
                quadratic loop won't have a big impact.
         */
        !valueCount[oneMeaningfulField][oneItem[oneMeaningfulField]]
          ? (valueCount[oneMeaningfulField][oneItem[oneMeaningfulField]] = 1)
          : valueCount[oneMeaningfulField][oneItem[oneMeaningfulField]]++;
      });
    });

    const report = {};

    meaningfulFields.forEach((oneMeaningfulField) => {
      report[oneMeaningfulField] = Object.entries(
        valueCount[oneMeaningfulField]
      )
        .map(([key, value]) => ({
          name: key,
          amount: value,
        }))
        .sort((a, b) => b.amount - a.amount);
    });

    return report;
  };

  const report = generateReport(intelligence);

  return (
    <div className="question2">
      <h3 className="question2__title">Second Question</h3>
      <p className="question2__description--filled">
        The fields "ioc", "lastSeen", and "seenBy" has been excluded from this
        report since this kind of information is irrelevant or non applicable
        from the point of view of a general report.
      </p>
      <p className="question2__list-descriptor">Threats:</p>
      <ul className="question2__list">
        {report.threat.map(({ name, amount }) => {
          return (
            <li key={name}>
              - {name}: {amount}
            </li>
          );
        })}
      </ul>
      <p className="question2__list-descriptor">Country Codes:</p>
      <ul className="question2__list">
        {report.countryCode.map(({ name, amount }) => {
          return (
            <li key={name}>
              - {name}: {amount}
            </li>
          );
        })}
      </ul>
      <p className="question2__description">
        Please checkout the source code for more details.
      </p>
    </div>
  );
};

export default Question2;
