import csv
from django.http import StreamingHttpResponse
from .models import SurveyData


class Echo:
    """An object that implements just the write method of the file-like
    interface.
    """

    def write(self, value):
        """Write the value by returning it, instead of storing in a buffer."""
        return value


def streaming_csv_view(request):
    """A view that streams a large CSV file."""
    # Generate a sequence of rows. The range is based on the maximum number of
    # rows that can be handled by a single sheet in most spreadsheet
    # applications.
    # rows = (["Row {}".format(idx), str(idx)] for idx in range(65536))
    rows = [["Gender", "Age(Yrs.)", "Marital_Status", "Father", "Mother", "Grand_Father", "Grand_Mother", "Siblings",
             "Pregnant", "Radiation", "Hairline_Pattern", "Hairstyle", "Density", "Hair_Fall_Rate", "Scalp_Infection",
             "Pain_Itch",
             "Nutrition", "Weight_Loss", "Sleeping_Pattern", "Chemical_Products", "Medication", "Region", "Label"]]
    for data in SurveyData.objects.all().order_by('-id').values():
        rows.append(list(data.values())[1:])
        # print(list(data.values())[1:])

    pseudo_buffer = Echo()
    writer = csv.writer(pseudo_buffer)
    return StreamingHttpResponse(
        (writer.writerow(row) for row in rows),
        content_type="text/csv",
        headers={'Content-Disposition': 'attachment; filename="survey_data.csv"'},
    )
