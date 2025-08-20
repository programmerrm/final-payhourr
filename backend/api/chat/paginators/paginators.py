from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class ConnectionRequestsPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 2
    page_query_param = 'page'

    def get_paginated_response(self, data, senders, receivers):
        return Response({
            "success": True,
            "message": "Users data fetching response successfully",
            "pagination": {
                "count": self.page.paginator.count,
                "current_page": self.page.number,
                "total_pages": self.page.paginator.num_pages,
                "has_next": self.page.has_next(),
                "has_previous": self.page.has_previous(),
            },
            "data": {
                "senders": senders,
                "receivers": receivers
            }
        })

class ConnectedUserPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 2
    page_query_param = 'page'

    def get_paginated_response(self, data):
        return Response({
            "success": True,
            "message": "Users data fetching response successfully",
            "pagination": {
                "count": self.page.paginator.count,
                "current_page": self.page.number,
                "total_pages": self.page.paginator.num_pages,
                "has_next": self.page.has_next(),
                "has_previous": self.page.has_previous(),
            },
            "data": data,
        })

class DisputePagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 2
    page_query_param = 'page'

    def get_paginated_response(self, data):
        return Response({
            "success": True,
            "message": "Dispute data fetching response successfully",
            "pagination": {
                "count": self.page.paginator.count,
                "current_page": self.page.number,
                "total_pages": self.page.paginator.num_pages,
                "has_next": self.page.has_next(),
                "has_previous": self.page.has_previous(),
            },
            "data": data,
        })
    