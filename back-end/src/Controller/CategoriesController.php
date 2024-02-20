<?php

namespace App\Controller;

use App\Entity\Categories;
use App\Repository\CategoriesRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\ParameterBag;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

class CategoriesController extends AbstractController
{
    #[Route('/api/categories', name: 'categories', methods: ['GET'])]
    // #[IsGranted('ROLE_ADMIN', message: 'Vous n\'avez pas les droits suffisants pour supprimer un utilisateur')]
    public function getUserList(SerializerInterface $serializer, CategoriesRepository $categoriesRepository): JsonResponse
    {
        $categoriesList = $categoriesRepository->findAll();
        $jsonUserList = $serializer->serialize($categoriesList, 'json', ['groups' => 'getCategories']);
        return new JsonResponse($jsonUserList, Response::HTTP_OK, [], true);
    }

    #[Route('/api/categories/{id}', name: 'detailCategories', methods: ['GET'])]
    public function getDetailUser(SerializerInterface $serializer, Categories $categories): JsonResponse
    {
        // $user = $userRepository->find($id);
        // if($user){
        $jsonUser = $serializer->serialize($categories, 'json', ['groups' => 'getCategories']);
        return new JsonResponse($jsonUser, Response::HTTP_OK, ['accept' => 'json'], true);
        // return new JsonResponse($jsonUser, Response::HTTP_OK, [], true);
        // }
        // return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }

    #[Route('/api/categories', name: "createCategories", methods: ['POST'])]
    public function createCategories(
        Request $request,
        SerializerInterface $serializer,
        EntityManagerInterface $em,
        UrlGeneratorInterface $urlGenerator,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        $categories = $serializer->deserialize($request->getContent(), Categories::class, 'json');
        $em->persist($categories);
        $em->flush();
        $jsonUser = $serializer->serialize($categories, 'json', ['groups' => 'getCategories']);
        $location = $urlGenerator->generate('detailUser', ['id' => $categories->getId()], UrlGeneratorInterface::ABSOLUTE_URL);
        return new JsonResponse($jsonUser, Response::HTTP_CREATED, ["Location" => $location], true);
    }


    #[Route('/api/categories/{id}', name: "deleteCategories", methods: ['DELETE'])]
    public function deleteCategories(Categories $categories, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($categories);
        $em->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/api/categories/{id}', name: "updateCategories", methods: ['PUT'])]
    public function updatecategorie(Categories $categories, Request $request, SerializerInterface $serializer, EntityManagerInterface $em): JsonResponse
    {
        $updatecategories =  $serializer->deserialize(
            $request->getContent(),
            Categories::class,
            'json',
            [AbstractNormalizer::OBJECT_TO_POPULATE => $categories]
        );
        $em->persist($updatecategories);
        $em->flush();
        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }
}
