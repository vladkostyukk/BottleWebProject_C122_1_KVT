from bottle import post, request
import re
import datetime

@post('/home', method='post')
def my_form():
    try:
        quest = request.forms.get('QUEST')
        mail = request.forms.get('ADRESS')
        username = request.forms.get('USERNAME')  # �������� �������� �� �����

        # �������� ������������� ���� �����
        if not quest or not mail or not username:
            raise ValueError("Please fill in all fields of the form.")

        # ������� ��� ������ ����������� ����� (�������� �� ������������ �������)
        pattern = r"^[^@<>\/\\\[\]]{1}[\w\.-]+@[\w\.-]+\.[a-zA-Z]{2,}$"

        if len(mail) > 50:
            raise ValueError("Email address length should not exceed 50 characters.")

        if not re.match(pattern, mail):
            raise ValueError("Please provide a valid email address.")

        # �������� �� �� ����� 5 �������� ����� ��������� �����
        if len(mail.split('.')[-1]) > 5:
            raise ValueError("No more than 5 characters are allowed after the last dot.")

        # ��������� ������� ��������� ����
        current_date = datetime.datetime.now().strftime("%Y-%m-%d")

        # ������������ ��������� � ���������� � ���������
        message = "Thanks, %s! Your question: %s. The answer will be sent to the email %s. Access Date: %s" % (username, quest, mail, current_date)

        return message
    except ValueError as e:
        return str(e)
    except Exception as e:
        return "An error occurred. Please try again later."

