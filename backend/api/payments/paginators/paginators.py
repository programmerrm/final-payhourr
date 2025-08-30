from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

# ALL PAYMENT PAGINATION
class AllPaymentPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 2
    page_query_param = 'page'

    def get_paginated_response(self, data):
        return Response({
            "success": True,
            "message": "All payment data fetching response successfully",
            "pagination": {
                "count": self.page.paginator.count,
                "current_page": self.page.number,
                "total_pages": self.page.paginator.num_pages,
                "has_next": self.page.has_next(),
                "has_previous": self.page.has_previous(),
            },
            "data": data,
        })

# DEPOSIT PAGINATION
class DepositPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 2
    page_query_param = 'page'

    def get_paginated_response(self, data):
        return Response({
            "success": True,
            "message": "Deposit data fetching response successfully",
            "pagination": {
                "count": self.page.paginator.count,
                "current_page": self.page.number,
                "total_pages": self.page.paginator.num_pages,
                "has_next": self.page.has_next(),
                "has_previous": self.page.has_previous(),
            },
            "data": data,
        })

# WITHDRAW PAGINATION
class WithdrawPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 2
    page_query_param = 'page'

    def get_paginated_response(self, data):
        return Response({
            "success": True,
            "message": "Withdraw data fetching response successfully",
            "pagination": {
                "count": self.page.paginator.count,
                "current_page": self.page.number,
                "total_pages": self.page.paginator.num_pages,
                "has_next": self.page.has_next(),
                "has_previous": self.page.has_previous(),
            },
            "data": data,
        })

# PAYMENT HISTORY PAGINATION
class PaymentHistoryPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 2
    page_query_param = 'page'

    def get_paginated_response(self, data):
        return Response({
            "success": True,
            "message": "Payment history data fetching response successfully",
            "pagination": {
                "count": self.page.paginator.count,
                "current_page": self.page.number,
                "total_pages": self.page.paginator.num_pages,
                "has_next": self.page.has_next(),
                "has_previous": self.page.has_previous(),
            },
            "data": data,
        })

# COMBINED TRANSACTION PAGINATION
class CombinedTransactionPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = 'page_size'
    max_page_size = 15

    def get_paginated_response(self, data):
        return Response({
            "success": True,
            "message": "All transactions history data fetching response successfully",
            "pagination": {
                "count": self.page.paginator.count,
                "current_page": self.page.number,
                "total_pages": self.page.paginator.num_pages,
                "has_next": self.page.has_next(),
                "has_previous": self.page.has_previous(),
            },
            "data": data,
        })
