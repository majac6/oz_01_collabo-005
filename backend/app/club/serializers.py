from django.db.models import Model
from rest_framework import serializers
from rest_framework.relations import SlugRelatedField

from app.activity.models import JoinedClub
from app.club.models import Club
from app.user.serializers import UserSerializer


# class ClubSerializer(serializers.HyperlinkedModelSerializer):
class ClubSerializer(serializers.ModelSerializer[Club]):
    leader: SlugRelatedField[Model | Model] = serializers.SlugRelatedField(read_only=True, slug_field="nickname")

    class Meta:
        model = Club
        fields = (
            "id",
            "url",
            "name",
            "description",
            "category",
            "image",
            "leader",
            "max_members",
            "frequent_place",
            "age_group",
            "created_at",
            "updated_at",
        )


class ClubMemberSerializer(serializers.ModelSerializer[JoinedClub]):
    user = UserSerializer(read_only=True)
    members_count = serializers.SerializerMethodField()

    class Meta:
        model = JoinedClub
        fields = ("id", "user", "members_count")

    def get_members_count(self, obj: JoinedClub) -> int:
        return obj.club.joinedclub_set.count()
